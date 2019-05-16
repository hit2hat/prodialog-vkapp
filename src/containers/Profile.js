import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Group, Cell, List, InfoRow, Button } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

import { fireEvent } from "../utils";

const Profile = ({ id, back, user, me }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                Профиль
            </PanelHeader>

            <Group>
                <Cell
                    description="Костыль"
                    asideContent={
                        !me ? <Button onClick={() => fireEvent("https://vk.com/id" + user.id)}>Профиль ВКонтакте</Button> : null
                    }
                    size="l"
                >
                    vk.me/id{user.id}
                </Cell>
            </Group>

            <Group title="Информация о пользователе">
                <List>
                    <Cell>
                        <InfoRow title="Карма">
                            {user.carma}
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow title="Мут">{user.mute ? "Есть" : "Нет"}</InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow title="Предупреждения">{user.warn ? "Есть" : "Нет"}</InfoRow>
                    </Cell>
                </List>
            </Group>

            <Group
                title="Специализация"
            >
                {user.role ? <List>{user.role.map((role) => <Cell>{role}</Cell>)}</List>
                    : <div style={{marginLeft: 12, paddingBottom: 15}}>Нет</div>
                }
            </Group>
        </Panel>
    );
};

const mapProps = (state) => ({
    me: state.user.vk.id === state.user.selected.id,
    user: state.user.selected
});

const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(Profile);