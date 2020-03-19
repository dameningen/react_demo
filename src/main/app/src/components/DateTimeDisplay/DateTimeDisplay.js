import React from "react";
import { convDateTIme } from "../../libs/common/dateUtil";
// components
import { Typography } from "../Wrappers/Wrappers";

/**
 * 日時表現文字列を日本標準時に変換して出力する
 * @param {*} props 
 */
export default function DateTimeDisplay(props) {
    return (
        <div>
            <Typography>
                {convDateTIme(props.val, props.dateFormat)}
            </Typography>
        </div>
    );
}
