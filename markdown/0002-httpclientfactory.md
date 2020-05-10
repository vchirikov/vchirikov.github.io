---
img: img/0002-01-httpclientfactory.png
title: HttpClientFactory disable logging
topic: C#
---

Sometimes when I'm using `HttpClientFactory` I want to disable standard logging with `Information` log level from `HttpClient`. Today I'll tell you how you can achive it.
<!-- </spoiler> -->

All that you need - create your `IHttpMessageHandlerBuilderFilter` which will clear additional handlers. So lets start:

```cs
public class NullLoggingFilter : IHttpMessageHandlerBuilderFilter
{
    public Action<HttpMessageHandlerBuilder> Configure(Action<HttpMessageHandlerBuilder> next) => builder => {
        // Run other builders first
        next(builder);
        builder.AdditionalHandlers.Clear();
    };
}
```

And now you can replace existing one with this.

*Startup.cs* (for example with [Refit](https://github.com/reactiveui/refit)):

```cs
services.AddRefitClient<IGithubApi>()
    .ConfigureHttpClient(c => c.BaseAddress = new Uri("https://api.github.com"))
    .ConfigurePrimaryHttpMessageHandler(() => new AuthenticatedHttpClientHandler(() => new ValueTask<string>(appOptions.GithubToken)));
// here we're removing the logging
services.Replace(ServiceDescriptor.Singleton<IHttpMessageHandlerBuilderFilter, NullLoggingFilter>());
```

That's it!
