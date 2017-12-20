let volunteer = {}
const cookie = localStorage.getItem('loggedInUser');

if (cookie) {
	volunteer = JSON.parse(cookie)
	volunteer.noUser = false
} else {
	volunteer.noUser = true
}

export default volunteer