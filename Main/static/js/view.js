/**
 * UI的一些操作
 * Created by chao on 2015/4/18.
 */
(function(){
    var $scope=angular.element('#task-list-date').scope();
    $('#task-list-date').sortable({
        cursor: "move",
        cancel:".task-content",
        update:function(event,ui){
            $scope.modifyTaskOrder(ui.item.prev('li').attr('id'),ui.item.attr('id'));
        }
    });
    $('li','#date-list').droppable({
        hoverClass:'drop-hover',
        drop:function(event,ui){
            var date=$(this).attr('data-id');
            $scope.modifyTaskDate(ui.draggable.attr('id'),date);
        },
        tolerance:'pointer'
    });
    $('#collapsed').click(function(){
        $('#left-view').toggle(function(){
                this.addClass('invisible-lg-block');
        },
        function(){

        });
        $('#right-view').toggle(function(){
                this.removeClass('col-md-offset-2');
        },
        function(){
            this.addClass('col-md-offset-2');
        });
    });
})();
