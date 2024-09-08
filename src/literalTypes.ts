// string literal type
type ShippingMethod = 'standard' | 'express' | 'overnight';

function setShippingMethod(shippingMethod: ShippingMethod): void {
  if (shippingMethod) {
    console.log(`Selected shipping method: ${shippingMethod}`);
  }
}

setShippingMethod('standard');
setShippingMethod('express');
setShippingMethod('overnight');

// error: Argument of type '"invalid"' is not assignable to parameter of type '"standard" | "express" | "overnight"'
// setShippingMethod('drone');

// Numeric literal type
type Rating = 1 | 2 | 3 | 4 | 5;

function setProductRating(rating: Rating): void {
  if (rating >= 1 && rating <= 5) {
    console.log(`Product rating with ${rating} stars`);
  } else {
    console.log('Invalid rating');
  }
}

setProductRating(1);
setProductRating(2);
setProductRating(3);
setProductRating(4);
setProductRating(5);

// error: Argument of type '6' is not assignable to parameter of type '1 | 2 | 3 | 4 | 5'
// setProductRating(6);

// Boolean literal type
type FeatureFlag = true | false;

function toggleFeatureFlag(flag: FeatureFlag): void {
  if (flag) {
    console.log('Feature flag enabled');
  } else {
    console.log('Feature flag disabled');
  }
}

toggleFeatureFlag(true);
toggleFeatureFlag(false);

// error: Argument of type '"YES"' is not assignable to parameter of type 'true | false'
// toggleFeatureFlag('YES');

// error: Argument of type '"YES"' is not assignable to parameter of type 'true | false'
// toggleFeatureFlag('NO');

// Union type with literal type
type LogLevel = 'debug' | 'info' | 'warning' | 'error';

function log(message: string, level: LogLevel): void {
  switch (level) {
    case 'debug':
      console.log(`[DEBUG] ${message}`);
      break;
    case 'info':
      console.log(`[INFO] ${message}`);
      break;
    case 'warning':
      console.log(`[WARNING] ${message}`);
      break;
    case 'error':
      console.log(`[ERROR] ${message}`);
      break;
  }
}

log('This is a debug message', 'debug');
log('This is an info message', 'info');
log('This is a warning message', 'warning');
log('This is an error message', 'error');

// error: Argument of type '"critical"' is not assignable to parameter of type '"debug" | "info" | "warning" | "error"'
// log('This is a critical message', 'critical');
