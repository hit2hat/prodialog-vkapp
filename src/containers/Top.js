import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Group, List, Avatar, Cell } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

const Top = ({ id, back, top, openProfile }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                Рейтинг
            </PanelHeader>
            <Group>
                <List>
                    {top.map((item, key) => {
                        return (
                            <Cell
                                key={key}
                                before={<Avatar src={item.avatar}/>}
                                description={"Карма: " + item.carma}
                                onClick={() => openProfile(item.id)}
                            >
                                {item.first_name + " " + item.last_name}
                            </Cell>
                        );
                    })}
                </List>
            </Group>
        </Panel>
    );
};

const mapProps = (state) => ({
    top: state.top
});

const mapDispatch = ({ navigator: { goBack }, user: { openProfile } }) => ({
    back: goBack,
    openProfile
});

export default connect(mapProps, mapDispatch)(Top);