/* instrumentation.ts */
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import {
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';

// Create OTLP exporters
const traceExporter = new OTLPTraceExporter({
  url: 'http://192.168.101.4:4318/v1/traces', // optional, defaults to environment variables
});

const metricExporter = new OTLPMetricExporter({
  url: 'http://192.168.101.4:4318/v1/metrics', // optional
});

// Initialize the SDK
const sdk = new NodeSDK({
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the SDK
sdk.start()

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down successfully'))
    .catch((err) => console.error('Error shutting down OpenTelemetry SDK', err))
    .finally(() => process.exit(0));
});
