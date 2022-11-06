import { emailRegex, urlRegex } from './constants'
import { isRef } from 'vue'

const rules = {
	required: {
		rule: value => {
			if (isRef(value)) return !!value.value.trim()
			return !!value?.trim()
		},
		message: 'Поле обязательно для заполнения'
	},
	email: {
		rule: value => {
			if (isRef(value)) {
				value = value.value
			}
			return !!value
				? emailRegex.test(String(value).toLowerCase())
				: true
		},
		message: 'Электроная почта имеет неверный формат'
	},
	url: {
		rule: value => {
			if (isRef(value)) {
				value = value.value
			}
			return !!value ? urlRegex.test(value) : true
		},
		message: 'Ссылка имеет неверный формат'
	}
}

/**
 * @param { String } value
 * @param { String[] } appliedRules
 * @returns {string}
 */

const validate = (value, appliedRules) => {
	let error = ''
	appliedRules.forEach(appliedRule => {
		if (!rules[appliedRule]) {
			return
		}
		const { rule, message } = rules[appliedRule]
		if (!rule(value)) {
			error = message
		}
	})
	return error
}

export const validateFields = (fields, validations) => {
	let isValid = true
	Object.keys(validations).forEach(key => {
		validations[key].error = validate(
			fields[key],
			validations[key].rules
		)
		if (validations[key].error) {
			isValid = false
		}
	})
	return isValid
}

export const clearValidationErrors = (validations) => {
	if (!validations) {
		return
	}
	Object.keys(validations).forEach(key => {
		validations[key].error = ''
	})
}
