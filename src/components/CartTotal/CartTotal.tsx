import { Group, Header, SimpleCell, Text } from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import './CartTotal.css';


export const CartTotal: FC = () => {

    const { totalPrice } = useAppSelector(state => state.cardReducer);
    const [s, setS] = useState({
        name: 1,
        email: 3,
    });

    useEffect(()=>{
        setS((s) => ({...s, email: 4}));
        console.log(s);
    }, [])
    

    return (
        <Group header={<Header mode="secondary">Итоговая стоимость</Header>} className='Price'>
            <SimpleCell>
                <Text className="Total">Итого: {totalPrice} руб.</Text>
            </SimpleCell>
        </Group>
    );
}