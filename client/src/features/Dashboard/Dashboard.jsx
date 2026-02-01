import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';

const Dashboard = () => {
  const [reactionTime] = useLocalStorageArray('reactionTime');
  const [mouseAim] = useLocalStorageArray('mouseAim');
  const [numberMemory] = useLocalStorageArray('numberMemory');
  const [verbalMemory] = useLocalStorageArray('verbalMemory');
  const [chimpTest] = useLocalStorageArray('chimpTest');
  const [typingSpeed] = useLocalStorageArray('typingSpeed');

  // Calculate statistics for all tests
  // For time-based tests (reactionTime, mouseAim), lower is better
  // For score-based tests, higher is better
  const calculateStats = (data, testType = null) => {
    if (data.length === 0) return { average: 0, best: 0, worst: 0, total: 0 };
    const numbers = data.map(Number).filter((n) => !isNaN(n));
    const isTimeBased = ['reactionTime', 'mouseAim'].includes(testType);

    return {
      average: (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(0),
      best: isTimeBased ? Math.min(...numbers) : Math.max(...numbers),
      worst: isTimeBased ? Math.max(...numbers) : Math.min(...numbers),
      total: numbers.length,
    };
  };

  // Normalize scores to 0-100 scale for fair comparison across different test types
  // Should eventually be based on percentile score compared to all users.
  const normalizeScore = (value, testType) => {
    // Define typical ranges for each test to normalize scores
    const ranges = {
      reactionTime: { min: 50, max: 600 }, // ms: lower is better, inverted
      mouseAim: { min: 50, max: 1000 }, // ms: lower is better, inverted
      numberMemory: { min: 1, max: 10 }, // numbers remembered
      verbalMemory: { min: 10, max: 100 }, // words
      chimpTest: { min: 1, max: 40 }, // sequence length
      typingSpeed: { min: 20, max: 250 }, // wpm
    };

    const range = ranges[testType] || { min: 0, max: 100 };
    const isTimeBased = ['reactionTime', 'mouseAim'].includes(testType);

    if (isTimeBased) {
      // For time-based: invert so lower times = higher score
      return Math.max(0, Math.min(100, ((range.max - value) / (range.max - range.min)) * 100));
    } else {
      // For score-based: higher values = higher score
      return Math.max(0, Math.min(100, ((value - range.min) / (range.max - range.min)) * 100));
    }
  };

  // Prepare data for comparison chart
  const comparisonData = useMemo(() => {
    const testTypes = {
      'Reaction Time': { data: reactionTime, type: 'reactionTime' },
      'Mouse Aim': { data: mouseAim, type: 'mouseAim' },
      'Number Memory': { data: numberMemory, type: 'numberMemory' },
      'Verbal Memory': { data: verbalMemory, type: 'verbalMemory' },
      'Chimp Test': { data: chimpTest, type: 'chimpTest' },
      'Typing Speed': { data: typingSpeed, type: 'typingSpeed' },
    };

    return Object.entries(testTypes).map(([name, { data, type }]) => {
      const stats = calculateStats(data, type);
      const normalizedAvg = normalizeScore(Number(stats.average), type);
      return {
        name,
        testType: type,
        average: Number(stats.average),
        normalizedAverage: normalizedAvg,
        best: stats.best,
        worst: stats.worst,
      };
    });
  }, [reactionTime, mouseAim, numberMemory, verbalMemory, chimpTest, typingSpeed]);

  // Prepare data for radar chart (normalized)
  const radarData = useMemo(() => {
    return comparisonData.map((item) => ({
      name: item.name.split(' ')[0], // Shortened names for radar
      score: item.normalizedAverage,
    }));
  }, [comparisonData]);

  // Prepare data for trend charts (showing progress)
  const timelineData = useMemo(() => {
    const maxLength = Math.max(
      reactionTime.length,
      mouseAim.length,
      numberMemory.length,
      verbalMemory.length,
      chimpTest.length,
      typingSpeed.length,
    );

    return Array.from({ length: maxLength }, (_, i) => ({
      attempt: i + 1,
      reactionTime: reactionTime[i] ? Number(reactionTime[i]) : null,
      mouseAim: mouseAim[i] ? Number(mouseAim[i]) : null,
      numberMemory: numberMemory[i] ? Number(numberMemory[i]) : null,
      verbalMemory: verbalMemory[i] ? Number(verbalMemory[i]) : null,
      chimpTest: chimpTest[i] ? Number(chimpTest[i]) : null,
      typingSpeed: typingSpeed[i] ? Number(typingSpeed[i]) : null,
    }));
  }, [reactionTime, mouseAim, numberMemory, verbalMemory, chimpTest, typingSpeed]);

  // Stats summary component
  const StatCard = ({ title, value, unit = 'ms' }) => (
    <div className="bg-slate-900 p-4 rounded-lg shadow-md border-l-4 border-teal-500">
      <p className="text-white text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-teal-200  00">
        {value} <span className="text-sm text-gray-300">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="w-full p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total Tests"
          value={comparisonData.reduce((sum, item) => sum + calculateStats([]).total, 0)}
          unit=""
        />
        <StatCard
          title="Best Reaction Time"
          value={calculateStats(reactionTime, 'reactionTime').best}
          unit="ms"
        />
        <StatCard
          title="Avg Score"
          value={Math.round(
            comparisonData.reduce((sum, item) => sum + item.average, 0) / comparisonData.length,
          )}
          unit="pts"
        />
      </div>

      {/* Average Scores by Test Type */}
      <div className="bg-slate-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-200 mb-4">
          Performance Score by Test (Normalized 0-100)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={0} textAnchor="end" height={100} tick={{ fill: '#fff' }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#fff' }} />
            <Tooltip formatter={(value) => `${value.toFixed(1)}/100`} />
            <Bar dataKey="normalizedAverage" fill="#14b8a6" name="Normalized Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Overview Radar Chart */}
      <div className="bg-slate-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-200 mb-4">Performance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#fff' }} />
            <Radar
              name="Performance"
              dataKey="score"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.6}
            />
            <Tooltip formatter={(value) => `${value.toFixed(1)}/100`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Chart - Progress over time */}
      <div className="bg-slate-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Progress Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="attempt" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reactionTime"
              stroke="#0ea5e9"
              name="Reaction Time"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="mouseAim"
              stroke="#f59e0b"
              name="Mouse Aim"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="numberMemory"
              stroke="#8b5cf6"
              name="Number Memory"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="verbalMemory"
              stroke="#ec4899"
              name="Verbal Memory"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="chimpTest"
              stroke="#10b981"
              name="Chimp Test"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="typingSpeed"
              stroke="#f97316"
              name="Typing Speed"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Results Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'Reaction Time', data: reactionTime, type: 'reactionTime' },
          { title: 'Mouse Aim', data: mouseAim, type: 'mouseAim' },
          { title: 'Number Memory', data: numberMemory, type: 'numberMemory' },
          { title: 'Verbal Memory', data: verbalMemory, type: 'verbalMemory' },
          { title: 'Chimp Test', data: chimpTest, type: 'chimpTest' },
          { title: 'Typing Speed', data: typingSpeed, type: 'typingSpeed' },
        ].map((test, idx) => {
          const stats = calculateStats(test.data, test.type);
          return (
            <div key={idx} className="bg-slate-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-200 mb-4">{test.title}</h3>
              <div className="space-y-2 mb-4 text-sm">
                <p className="text-gray-100">
                  <span className="font-semibold">Attempts:</span> {stats.total}
                </p>
                <p className="text-gray-100">
                  <span className="font-semibold">Average:</span> {stats.average}
                </p>
                <p className="text-gray-100">
                  <span className="font-semibold">Best:</span> {stats.best}
                </p>
                <p className="text-gray-100">
                  <span className="font-semibold">Worst:</span> {stats.worst}
                </p>
              </div>
              <p className="text-xs text-gray-50">Scores: {test.data.join(', ') || 'No data'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
