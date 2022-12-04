import { defineStore } from 'pinia'
import { commentsService } from '@/services'
import { useUsersStore } from '@/stores'

export const useCommentsStore = defineStore('comments', {
	state: () => ({
		comments: [],
	}),
	getters: {
		getCommentsByTaskId: state => taskId => {
			const usersStore = useUsersStore()
			return state.comments.filter(comment => comment.taskId === taskId).map(comment => ({
				...comment,
				user: usersStore.users.find(user => comment.userId === user.id)
			}))
		}
	},
	actions: {
		async fetchComments () {
			this.comments = await commentsService.fetchComments()
		},
		async addComment (comment) {
			const newComment = await commentsService.createComment(comment)
			this.comments.push(newComment)
		}
	},
})
