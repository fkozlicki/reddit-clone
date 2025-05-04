import {
	ApolloLink,
	FetchResult,
	Observable,
	Operation,
} from '@apollo/client/core';
import { ExecutionResult, print } from 'graphql';
import { Client, ClientOptions, createClient } from 'graphql-sse';

export class SSELink extends ApolloLink {
	private client: Client;

	constructor(options: ClientOptions) {
		super();
		this.client = createClient(options);
	}

	public request(operation: Operation): Observable<ExecutionResult> {
		return new Observable((sink) => {
			return this.client.subscribe<ExecutionResult>(
				{ ...operation, query: print(operation.query) },
				{
					next: sink.next.bind(sink),
					complete: sink.complete.bind(sink),
					error: sink.error.bind(sink),
				}
			);
		});
	}
}
