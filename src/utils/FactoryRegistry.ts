///
/// FactoryRegistry
///
/// Contains a factory implementation that creates objects depending on
/// their relevance to a given context.
///

type IConstructorFunc<TContext, TProduct> = (context: TContext) => TProduct
type IRatingFunc<TContext> = (context: TContext) => number

interface IRegistryRecord<TContext, TProduct> {
	readonly ratingFunc: IRatingFunc<TContext>
	readonly constructorFunc: IConstructorFunc<TContext, TProduct>
}


/**
 * Abstract factory implementation.
 * Type parameter `TContext` defines the context type. Contexts are passed to both rating functions and
 * constructor functions.
 * Type parameter `TProduct` defines the type of objects that are created by a factory.
 */
export class FactoryRegistry<TContext, TProduct> {
	///
	/// Public Interface:
	///


	/**
	 * Creates a new `FactoryRegistry` instance.
	 */
	public static create<TContext, TProduct>() {
		return new FactoryRegistry<TContext, TProduct>()
	}


	/**
	 * Register a constructor function.
	 * @param ratingFunc The function used to determine whether the registered constructor function is
	 *                   relevant for a given construction context.
	 * @param constructorFunc The function that creates an object instance if the result of `ratingFunc`
	 *                        has determined that this constructor function is relevant for the given
	 *                        construction context.
	 */
	public register(
		ratingFunc: IRatingFunc<TContext>,
		constructorFunc: IConstructorFunc<TContext, TProduct>
	) {
		this.registry.push({ ratingFunc, constructorFunc })
	}


	/**
	 * Class decorator that registers the decorated class as a constructor function.
	 * The decorated class must instantiate to an instance of `TProduct`.
	 * @param ratingFunc The function used to determine whether the registered constructor function is
	 *                   relevant for a given construction context.
	 */
	public registerClass(ratingFunc: IRatingFunc<TContext>) {
		return (classConstructor: { new(params?: TContext): TProduct }) => {
			this.register(ratingFunc, params => new classConstructor(params))
		}
	}


	/**
	 * Creates an instance of `TProduct` based on the context passed into this method.
	 * @param context The context to create a product for.
	 */
	public create(context: TContext) {
		const constructorFunc = this.findConstructorForContext(context)
		return constructorFunc.call(undefined, context)
	}


	///
	/// Internals:
	///


	/**
	 * @see Static method `FactoryRegistry.create()`.
	 */
	protected constructor() {
		// nothing to do
	}


	/**
	 * Contains all registered constructor functions and their rating functions.
	 */
	private readonly registry: Array<IRegistryRecord<TContext, TProduct>> = []



	/**
	 * Creates a function that can be used to sort arrays of `IRegistryRecord`s by their rating for a 
	 * given context. The function is meant to be passed into `Array.prototype.sort()`.
	 * @param context The context to create a sorter function for.
	 */
	private createRatingSorter(context: TContext) {
		return (
			a: IRegistryRecord<TContext, TProduct>,
			b: IRegistryRecord<TContext, TProduct>
		) => {
			const orderA = a.ratingFunc(context)
			const orderB = b.ratingFunc(context)
			if (orderA > orderB) {
				return -1
			} else if (orderA < orderB) {
				return 1
			} else {
				return 0
			}
		}
	}



	/**
	 * Finds the best matching constructor function for a given context and returns it.
	 * @throws
	 * @param context The context to find a constructor function for.
	 * @return The constructor function for the given context.
	 */
	private findConstructorForContext(context: TContext): IConstructorFunc<TContext, TProduct> {
		const list = this.registry
			// find all constructors that have a rating > 0
			.filter(registered => (registered.ratingFunc(context) || 0) > 0)
			// sort by rating descending
			.sort(this.createRatingSorter(context))
		if (list.length < 1) {
			throw new Error(
				'Unable to find matching constructor for context ' +
				this.tryStringifyContext(context)
			)
		}
		// the first item in `list` is the item with the best match
		return list[0].constructorFunc
	}

	/**
	 * Attempts to stringify a context object for debugging.
	 */
	private tryStringifyContext(context: TContext): string {
		try {
			return JSON.stringify(context)
		} catch {
			// ignore error, just return
			return ''
		}
	}
}

export default FactoryRegistry
