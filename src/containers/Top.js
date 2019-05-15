import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader, Group, List, Avatar, Cell } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

import { fireEvent } from "../utils";

const Top = ({ id, back, top }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                Рейтинг
            </PanelHeader>
            <Group>
                <List>
                    {top.map((item) => {
                        return (
                            <Cell
                                before={<Avatar src={item.avatar}/>}
                                description={"Карма: " + item.carma}
                                onClick={() => fireEvent("https://vk.com/id" + item.id)}
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

const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(Top);