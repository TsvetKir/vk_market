import { Button, CardGrid, Div, Group, Header } from "@vkontakte/vkui";
import { FC, useCallback } from "react";
import { ItemCart } from "../ItemCard/ItemCart";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCards } from "../../store/reducers/ActionCreators";
import './CartList.css';


export const CartList: FC = () => {

    const { cards, isLoading } = useAppSelector(state => state.cardReducer);
    const dispatch = useAppDispatch();

    const handleUpdate = useCallback(() => {
        dispatch(fetchCards());
    }, [dispatch])

    return (
        <Group header={<Header mode="secondary">Корзина</Header>}>
            <CardGrid size='l'>
                {cards.map((item) => {
                    return <ItemCart props={item} key={item.id}></ItemCart>
                })}
            </CardGrid>
            {!cards.length && !isLoading &&
                <Div className="Update">
                    <Button mode="primary" onClick={handleUpdate} className="Update_btn">Обновить!</Button>
                </Div>
            }
        </Group>
    );
}