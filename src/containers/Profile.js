import React from "react";
import { connect } from "react-redux";
import {HeaderButton, Panel, PanelHeader, platform, IOS} from "@vkontakte/vkui";

import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

const osname = platform();

const Profile = ({ id, back }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={() => back()}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
            >
                Профиль
            </PanelHeader>
        </Panel>
    );
};

const mapProps = (state) => ({
    user: state.user
});

const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(Profile);