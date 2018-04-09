module.exports = {
	obscureEmail: function (email) {
		try {
			let split = email.split('@')
			let username = split[0]
			let domain = split[1].split('.')
			let tld = domain.splice(-1,1).join('')
			domain = domain.join('.')

			let maskExceptEdges = function (string) {
				let mapped = string.split('').map((letter, index) => {
					if (index !== 0 && index !== username.length - 1) {
						return '*'
					} else {
						return letter
					}
				})
				return mapped.join('')
			}

			domain = maskExceptEdges(domain)
			username = maskExceptEdges(username)

			return username + '@' + domain + '.' + tld
		} catch (err) {
			return ''
		} 
	}
}