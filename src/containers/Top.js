import React from "react";
import { connect } from "react-redux";
import {HeaderButton, Panel, PanelHeader, Group, List, Avatar, Cell, platform, IOS} from "@vkontakte/vkui";

import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

const osname = platform();

const Top = ({ id, back, top }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={() => back()}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
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