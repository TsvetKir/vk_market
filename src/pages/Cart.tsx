import { Div, Panel, PanelHeader, SplitCol, SplitLayout, View, usePlatform } from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchCards } from "../store/reducers/ActionCreators";
import { CartTotal } from "../components/CartTotal";
import { CartList } from "../components/CartList";
import './Cart.css';
import { Loader } from "../components/Loader";


export const Cart: FC = () => {

    const platform = usePlatform();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.cardReducer);

    useEffect(() => {
        dispatch(fetchCards());
    }, []);

    return (
        <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
            <SplitCol autoSpaced width={'25%'}>
                <View activePanel="main">
                    <Panel id="main">
                        <PanelHeader>Профильное задание</PanelHeader>
                        <CartList />
                        <Loader isLoading={isLoading}></Loader>
                    </Panel>
                </View>
            </SplitCol>
            <SplitCol autoSpaced >
                <View activePanel="main">
                    <Panel id="main" >
                        <Div className="Total_panel">
                            <PanelHeader />
                            <CartTotal />
                        </Div>
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
}