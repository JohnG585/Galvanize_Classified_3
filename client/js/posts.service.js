(function() {
  'use strict';

  angular.module('app')
    .service('postService', service)

    service.$inject = ['$http']

    function service($http) {
      this.getPosts = function() {
        return $http.get('/api/index').then((results) => {
          return results.data
        })
      }
      this.addPost = function(addPost) {
        return $http.post('/api/index', addPost).then((result) => {
          return result.data
        })
      }
      this.editingPost = function(id) {
        return $http.get(`/api/index/${id}`).then((results) => {
          return results.data
        })
      }
      this.editPost = function(id, editedPost) {
        return $http.patch(`/api/index/${id}`, editedPost).then((result) => {
          return $http.get('/api/index').then((result) => {
            return result.data
          })
        })
      }
      this.deletePost = function(id) {
        return $http.delete(`/api/index/${id}`).then((results) => {
          return $http.get('/api/index').then((result) => {
            return result.data
          })
        })
      }

    }
})()
