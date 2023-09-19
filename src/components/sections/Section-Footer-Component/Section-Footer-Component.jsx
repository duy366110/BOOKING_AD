import React from "react";
import { useSelector } from "react-redux";
import CommonPopupLoaderComponent from "../../common/Common-Popup-Component/Common-Popup-Loader-Component/Common-Popup-Loader-Component";
import CommonPopupMessageComponent from "../../common/Common-Popup-Component/Common-Popup-Message-Component/Common-Popup-Message-Component";
import classes from "./Section-Footer-Component.module.css";

const SectionFooterComponent = (props) => {
    const popup = useSelector((state) => state.popup);

    return (
        <footer>
            <CommonPopupMessageComponent />
            {popup.loader.status && <CommonPopupLoaderComponent />}
        </footer>
    )
}

export default SectionFooterComponent;