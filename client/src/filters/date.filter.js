import moment from 'moment';
/**
 * @return {string}
 */
export function DateFilter(value) {
	if (value) {
		return moment(String(value)).format('MM/DD/YYYY hh:mm');
	}
	return '';
}
