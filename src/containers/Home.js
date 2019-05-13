import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Cell, Group, Avatar, PanelHeader } from '@vkontakte/vkui';

const Home = ({ id, fetchedUser, go }) => (
	<Panel id={id}>
		<PanelHeader>ProDialog</PanelHeader>
		{fetchedUser &&
		<Group
			title="Мой профиль"
		>
			<Cell
				expandable
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
				onClick={() => go("profile")}
			>
				{fetchedUser.first_name + ' ' +fetchedUser.last_name}
			</Cell>
		</Group>}
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

Home.defaultProps = {
	id: "1",
	fetchedUser: {
		photo_200: "https://sun1-23.userapi.com/c850632/v850632751/1099c4/qw3BsBsm7OU.jpg?ava=1",
		first_name: "Степан",
		last_name: "Новожилов",
		city: {
			title: "Рыбинск"
		}
	}
};

export default Home;
