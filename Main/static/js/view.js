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
            var date=$(this).attr('data-day');
            console.log($scope.dateNum);
            if(date!=$scope.dateNum){
                $scope.modifyTaskDate(ui.draggable.attr('id'),date);
            }
        },
        tolerance:'pointer'
    });
    $('#collapsed').click(function() {
        var $left=$('#left-view');
        var $right=$('#right-view');
        if($left.attr('class')=='my-2'){
            $left.removeClass('my-2').hide();
            $right.removeClass('my-offset-2').removeClass('my-10').addClass('my-12');
        }else{
            $left.addClass('my-2').show();
            $right.addClass('my-offset-2').addClass('my-10').removeClass('my-12');
        }
    });
})();
