import { defineStore } from 'pinia'
import { commentsService } from '@/services'

export const useCommentsStore = defineStore('comments', {
	state: () => ({
		comments: [],
	}),
	getters: {},
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
