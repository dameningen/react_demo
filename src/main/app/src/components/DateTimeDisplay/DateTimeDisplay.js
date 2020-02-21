import React from "react";
import { convDateTIme } from "../../libs/common/dateUtil";
// components
import { Typography } from "../Wrappers/Wrappers";

export default function DateTimeDisplay(props) {
    return (
        <div>
            <Typography>
                {convDateTIme(props.val, props.dateFormat)}
            </Typography>
        </div>
    );
}
