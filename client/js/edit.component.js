(function() {
    'use strict';

    angular.module('app')
        .component('editForm', {
            templateUrl: './templates/edit.html',
            controller: controller,
        })

    controller.$inject = ['postService', '$state', '$stateParams']

    function controller(postService, $state, $stateParams) {
        const vm = this;

        vm.$onInit = function() {
            const postId = $stateParams.id
            postService.editingPost(postId).then((result) => {
                vm.post = result
            })
        }
        vm.editingForm = function() {
            postService.editPost(vm.post.id, vm.post).then((result) => {
                $state.go('home')
                vm.posts = result
            })
        }
    }
})();
