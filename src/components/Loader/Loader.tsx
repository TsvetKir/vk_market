import { PanelSpinner } from "@vkontakte/vkui";


export const Loader = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;
    return <PanelSpinner>Список товаров загружается</PanelSpinner>;
}