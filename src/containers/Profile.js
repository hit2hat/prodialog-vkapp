import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Group, Cell, List } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const Profile = ({ id, back, roles, mute, carma, warn }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                Профиль
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
    warn: state.user.warn
});

const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(Profile);