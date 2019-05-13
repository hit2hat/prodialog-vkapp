import React from "react";
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

export default Profile;