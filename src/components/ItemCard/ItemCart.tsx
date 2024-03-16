import { FC, useCallback } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { ICard } from "../../models/ICard";
import { Card, Title, Text, Div, Image} from "@vkontakte/vkui";
import { cardSlice } from "../../store/reducers/CardSlice"
import { Counter } from "../Counter/Counter";
import "./ItemCart.css";
import { Icon24DeleteOutline } from "@vkontakte/icons";

interface IItemCartProps {
    props: ICard,
}


export const ItemCart: FC<IItemCartProps> = ({ props }) => {

    const dispatch = useAppDispatch()

    const onDelClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(cardSlice.actions.deleteItemCart(props.id));
        },
        [dispatch, props.id]
    )

    const onTotalChange = useCallback(
        (value: number) => {
            dispatch(cardSlice.actions.updateTotelItem({ id: props.id, totalItemsToBuy: value }))
        },
        [props.id, dispatch]
    )

    return (
        <Card className="Card">
            <Div className="Card_blockImg">
                <Image src={props.image} borderRadius="l" size={200}></Image>
            </Div>

            <Div className="Card_right">
                <Div className="Card_descr">
                    <Title level="1" className="Card_title">{props.title}</Title>
                    <Text weight="3" className="Card_text">{props.description}</Text>
                    <Text weight="1" className="Card_price">{props.price} ₽</Text>
                    
                </Div>
                <Div className="Card_bottom">
                    <Counter
                        maxValue={10}
                        minValue={1}
                        defValue={props.totalItemsToBuy}
                        onCange={onTotalChange}
                    />
                    <Div
                        className="Card_del"
                        onClick={onDelClick}
                    >
                        <Icon24DeleteOutline className="Card_del_img"/> 
                        Удалить
                    </Div>
                </Div>
            </Div>
        </Card>
    );
}