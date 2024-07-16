import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
    @Query(() => String, { name: 'hello', description: 'Return Hola Mundo' })
    helloWorld(): string {
        return 'Hola Mundo';
    }

    @Query(
        () => Int,
        {
            name: 'randomFromZeroTo',
            description: 'Return a number from zero to argument to (default 6)'
        })
    getRandomFromZeroTo(
        @Args('to', { type: () => Int, nullable: true })
        number: number = 5): number {
        return Math.floor(Math.random() * number);
    }
}

