import React from "react";
import { connect } from "react-redux";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

// import { fireEvent } from "../utils";

const About = ({ id, back }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={back} />}
            >
                О сервисе
            </PanelHeader>
        </Panel>
    );
};

const mapProps = () => ({});
const mapDispatch = ({ navigator: { goBack } }) => ({
    back: goBack
});

export default connect(mapProps, mapDispatch)(About);