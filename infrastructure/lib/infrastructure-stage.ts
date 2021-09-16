import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { InfrastructureStack } from './infrastructure-stack';

/**
 * Deployable unit of web service app
 */
export class InfrastructureStage extends Stage {
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new InfrastructureStack(this, 'ReactDemoApp');
  }
}