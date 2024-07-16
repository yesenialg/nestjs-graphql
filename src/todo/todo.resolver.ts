import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly _todoService: TodoService
    ) { }

    @Query(() => [Todo], { name: 'AllTodos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this._todoService.findAll(statusArgs);
    };

    @Query(() => Todo, { name: 'TodoById' })
    findOne(@Args('id', { type: () => Int }) id: number): Todo {
        return this._todoService.findOne(id);
    };

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        return this._todoService.create(createTodoInput);
    };

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this._todoService.update(updateTodoInput);
    };

    @Mutation(() => Boolean, { name: 'deleteTodo' })
    deleteTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this._todoService.delete(id);
    };

    //Aggregations
    @Query(() => Int, { name: 'totalTodos'})
    totalTodos(){
        return this._todoService.totalTodos;
    }

    @Query(() => Int, { name: 'completedTodos'})
    completedTodos(){
        return this._todoService.completedTodos;
    }

    @Query(() => Int, { name: 'pendingTodos'})
    pendingTodos(){
        return this._todoService.pendingTodos;
    }

    ///////
    @Query(() => AggregationsType, { name: 'AggregationsTodos'})
    aggregations(): AggregationsType{
        return {
            completed: this._todoService.completedTodos,
            pending: this._todoService.pendingTodos,
            total: this._todoService.totalTodos,
            totalTodoscompleted: this._todoService.totalTodos
        }
    }
}
