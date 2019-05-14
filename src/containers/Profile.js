import React from "react";
import { connect } from "react-redux";
import {HeaderButton, Panel, PanelHeader, platform, Group, Cell, List, IOS} from "@vkontakte/vkui";

import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

const osname = platform();

const Profile = ({ id, back, roles, mute, carma, name, warn }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={() => back()}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
            >
                {name}
            </PanelHeader>
            <Group title="Карма">
                <div style={{marginLeft: 12, paddingBottom: 15}}>{carma}</div>
            </Group>
            <Group title="Мут">
                <div style={{marginLeft: 12, paddingBottom: 15}}>{mute ? "Есть" : "Нет"}</div>
            </Group>
            <Group title="Предупреждения">
                <div style={{marginLeft: 12, paddingBottom: 15}}>{warn ? "Есть" : "Нет"}</div>
            </Group>
            <Group
                title="Роли"
            >
                {roles ? <List>{roles.map((role) => <Cell>{role}</Cell>)}</List>
                    : <div style={{marginLeft: 12, paddingBottom: 15}}>Нет</div>
                }
            </Group>
        </Panel>
    );
};

const mapProps = (state) => ({
    roles: state.user.role,
    mute: state.user.mute,
    carma: state.user.carma,
    warn: state.user.warn,
    name: state.user.first_name + " " + state.user.last_name
});

const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(Profile);