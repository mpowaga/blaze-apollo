let apolloClient;

function evaluate(o, ...args) {
  return typeof o === 'function' ? o(...args) : o;
}

function runQueries(queries) {
  const instance = Template.instance();

  Object.keys(queries).forEach((key) => {
    const result = new ReactiveVar({ loading: true });
    const vars = queries[key].variables;

    instance.view.template.__helpers.set(key, () => result.get());
    instance[key] = () => ({ ...result.get(), refetch });

    let variables = vars;
    if (typeof variables === 'function')
      instance.autorun((c) =>
        c.firstRun ? variables = evaluate(variables, instance) : refetch());

    const observable = apolloClient.watchQuery({ ...queries[key], variables });
    const subscription = observable.subscribe({
      next: ({ errors, data }) =>
        result.set({ ...data, errors, loading: false })
    });

    instance.view.onViewDestroyed(() => subscription.unsubscribe());

    function refetch(variables) {
      subscription.refetch(variables || evaluate(vars, instance));
    }
  });
};

Blaze.Template.prototype.queries = function (queries) {
  this.onCreated(() => runQueries(queries));
};

Blaze.Template.prototype.mutations = function (mutations) {
  this.onCreated(() => {
    const instance = Template.instance();
    Object.keys(mutations).forEach((key) => {
      instance[key] = (...variables) => {
        const mutation = mutations[key](...variables);
        mutation.variables = evaluate(mutation.variables, instance);
        return apolloClient.mutate(mutation);
      };
    });
  });
};

export default function connect(client) {
  apolloClient = client;
};
