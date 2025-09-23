import { useState } from "react";
import ClickBox from "./ClickBox";

function ReactionTime() {
    const [time, setTime] = useState();
    return (
        <>
        <ClickBox/>
        <p>Reaction time</p>
        </>
    )
}

export default ReactionTime;