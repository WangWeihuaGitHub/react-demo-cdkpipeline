import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { ReactDemoStack } from './react-demo-stack';

/**
 * Deployable unit of web service app
 */
export class ReactDemoStage extends Stage {
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new ReactDemoStack(this, 'ReactDemoApp');
  }
}