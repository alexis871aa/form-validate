import styles from './app.module.css';
import { useState, useRef } from 'react';
import { useStore, sendData } from './utils';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from './consts';

export const App = () => {
	const { getState, updateState } = useStore();
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPassError, setRepeatPassError] = useState(null);
	const submitButtonRef = useRef(null);

	const { email, password, repeatPass } = getState();

	const handleChange = ({ target }) => {
		updateState(target.name, target.value);

		let errorEmailMessage = null;
		let errorPasswordMessage = null;
		let errorRepeatPasswordMessage = null;
		switch (target.name) {
			case 'email':
				if (target.value.length > 20) {
					errorEmailMessage = 'Неверный E-mail. Введите не больше 20 символов.';
				}
				setEmailError(errorEmailMessage);
				break;
			case 'password':
				if (!PASSWORD_REGEXP.test(target.value)) {
					errorPasswordMessage =
						'Неверный пароль. Допустимые символы - буквы, цифры и нижнее подчёркивание.';
				} else if (target.value.length > 20) {
					errorPasswordMessage =
						'Неверный пароль. Введите не больше 20 символов.';
				}
				setPasswordError(errorPasswordMessage);
				break;
			case 'repeatPass':
				if (!PASSWORD_REGEXP.test(target.value)) {
					errorRepeatPasswordMessage =
						'Неверный пароль. Допустимые символы - буквы, цифры и нижнее подчёркивание.';
				} else if (target.value.length > 20) {
					errorRepeatPasswordMessage =
						'Неверный пароль. Введите не больше 20 символов.';
				}
				if (target.value.length === 8) {
					submitButtonRef.current.focus();
				}
				setRepeatPassError(errorRepeatPasswordMessage);
				break;
		}
	};

	const onBlur = ({ target }) => {
		let errorEmailMessage = null;
		let errorPasswordMessage = null;
		let errorRepeatPasswordMessage = null;
		switch (target.name) {
			case 'email':
				if (!EMAIL_REGEXP.test(target.value)) {
					errorEmailMessage =
						'Неверный E-mail. Введите стандартный формат электронной почты.';
				} else if (target.value.length < 3) {
					errorEmailMessage = 'Неверный E-mail. Введите не менее 3-х символов.';
				}
				setEmailError(errorEmailMessage);
				break;
			case 'password':
				if (target.value.length < 3) {
					errorPasswordMessage =
						'Неверный пароль. Введите не менее 3-х символов.';
				}
				setPasswordError(errorPasswordMessage);
				break;
			case 'repeatPass':
				if (target.value.length < 3) {
					errorRepeatPasswordMessage =
						'Неверный пароль. Введите не менее 3-х символов.';
				} else if (target.value !== password) {
					errorRepeatPasswordMessage =
						'Неверный пароль. Несовпадает с полем пароль.';
				}
				setRepeatPassError(errorRepeatPasswordMessage);
				break;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		sendData(getState());
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit}>
				{emailError && <div className={styles.errorMessage}>{emailError}</div>}
				{passwordError && (
					<div className={styles.errorMessage}>{passwordError}</div>
				)}
				{repeatPassError && (
					<div className={styles.errorMessage}>{repeatPassError}</div>
				)}
				<input
					type="email"
					name="email"
					value={email}
					placeholder="E-mail"
					onChange={handleChange}
					onBlur={onBlur}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Введите пароль"
					onChange={handleChange}
					onBlur={onBlur}
				/>
				<input
					type="password"
					name="repeatPass"
					value={repeatPass}
					placeholder="Повторите пароль"
					onChange={handleChange}
					onBlur={onBlur}
				/>
				<button
					type="submit"
					ref={submitButtonRef}
					disabled={
						emailError !== null ||
						passwordError !== null ||
						repeatPassError !== null
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
