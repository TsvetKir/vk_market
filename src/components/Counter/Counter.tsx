import { Icon16Minus, Icon16Add } from "@vkontakte/icons";
import { Div, IconButton } from "@vkontakte/vkui";
import cx from "classnames";
import React, { FC, useCallback, useEffect, useState } from "react";
import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';
import './Counter.css';


interface ICounterProps {
    maxValue: number,
    minValue: number,
    defValue: number,
    onCange: (value: number) => void,
}

export const Counter: FC<ICounterProps> = ({ maxValue, minValue, defValue, onCange }) => {

    const [value, setValue] = useState(defValue);
    const iconColor = baseTheme.colorIconAccent.normal.value

    const onMinus = useCallback(() => {
        setValue(value => value - 1)
    }, [])

    const onAdd = useCallback(() => {
        setValue(value => value + 1)
    }, [])

    useEffect(() => {
        onCange(value)
    }, [value, onCange])

    return (
        <Div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="Counter"
        >
            <Div className={cx('Counter_button', {
                Counter_button__disable: value === minValue,
            })}>
                <IconButton onClick={onMinus} aria-label="minus">
                    <Icon16Minus fill={iconColor}></Icon16Minus>
                </IconButton>
            </Div>
            <Div className="Counter_value">{value}</Div>
            <Div className={cx('Counter_button', {
                Counter_button__disable: value === maxValue,
            })}>
                <IconButton onClick={onAdd} aria-label="plus">
                    <Icon16Add fill={iconColor}></Icon16Add>
                </IconButton>
            </Div>

        </Div>
    );
}