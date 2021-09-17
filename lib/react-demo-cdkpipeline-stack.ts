
import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import { ReactDemoStage } from './react-demo-stage';
import { ShellScriptAction } from '@aws-cdk/pipelines';

/**
 * The stack that defines the application pipeline
 */
export class ReactDemoCdkpipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'ReactDemoPipeline',

       // How it will be built and synthesized
       synth: new ShellStep('Synth', {
         // Where the source can be found
         input: CodePipelineSource.gitHub('WangWeihuaGitHub/react-demo-cdkpipeline', 'main'),
         
         // Install dependencies, build and run cdk synth
         commands: [
         // 'cd demo-react-cdkpipeline',
            'npm ci',
            'cd ..',
            'cd react-demo',
  	        'npm run build',
            'cd ..',
            'cd lib',
	        'npx cdk synth'
      	 ],
         //primaryOutputDirectory: 'demo-react-cdkpipeline/cdk.out',
       }),
    });

    // This is where we add the application stages
    
    // pipeline.addStage(new CdkpipelinesDemoStage(this, 'PreProd', {
    //   env: { account: '915271087263', region: 'us-west-2' }
    // }));

    const preprod = new ReactDemoStage(this, 'PreProd', {
      env: { account: '915271087263', region: 'us-west-2' }
    });
    const preprodStage = pipeline.addStage(preprod);
  }
}