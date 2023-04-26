import { Dispatch } from 'redux';
import { appActions } from 'app/app.reducer';
import { ResponseType } from '../types';

/**
 * Обработчик ошибок сервера для приложения.
 *
 * @template D - тип данных, содержащихся в ответе сервера
 * @param {ResponseType<D>} data - ответ сервера, содержащий данные и сообщения об ошибках
 * @param {Dispatch} dispatch - Функция dispatch из библиотеки Redux для отправки actions
 * @param {boolean} [showError=true] - опциональный параметр, указывающий, нужно ли показывать ошибку пользователю
 * @returns {void}
 */
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true
) => {
	if (showError) {
		dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
	}
}
