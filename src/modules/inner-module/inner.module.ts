import { DynamicModule, Module } from '@nestjs/common';
import { InnerService } from './inner.service';
import { INNER_MODULE_OPTIONS } from './module-options.const';

@Module({})
export class InnerModule {
  static forRootAsync(options): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    console.log(asyncProviders);
    console.log(options);
    return {
      module: InnerModule,
      providers: [
        {
          provide: INNER_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        InnerService,
      ],
      exports: [InnerService],
      imports: options.imports,
    };
  }

  static createAsyncProviders(options) {
    if (options.useFactory || options.useExisting) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
        inject: [...(options.inject || [])],
        import: [...(options.import || [])],
      },
    ];
  }

  static createAsyncOptionsProvider(options) {
    if (options.useFactory) {
      return {
        provide: INNER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
        import: [...(options.import || [])],
      };
    }

    if (options.useClass || options.useExisting) {
      return {
        provide: INNER_MODULE_OPTIONS,
        useFactory: async (optionsFactory) =>
          optionsFactory.createOpenTelemetryOptions(),
        inject: [options.useClass || options.useExisting],
        import: [...(options.import || [])],
      };
    }
  }
}
