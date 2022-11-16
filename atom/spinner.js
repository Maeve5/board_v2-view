import { atom } from 'recoil';

const spinnerState = atom({
	key: 'spinnerState',
	default: false
});

export default spinnerState;