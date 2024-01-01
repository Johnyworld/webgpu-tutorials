import shader from './shaders.wgsl';

const Initialize = async () => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('gfx-main');
  const adapter: GPUAdapter = <GPUAdapter>await navigator.gpu?.requestAdapter();
  const device: GPUDevice = <GPUDevice>await adapter.requestDevice();
  const context: GPUCanvasContext = <GPUCanvasContext>canvas.getContext('webgpu');
  const format: GPUTextureFormat = 'bgra8unorm';
  context.configure({
    device,
    format,
  });

  const pipeline: GPURenderPipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: device.createShaderModule({
        code: shader,
      }),
      entryPoint: 'vs_main',
    },
    fragment: {
      module: device.createShaderModule({
        code: shader,
      }),
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
    },
  });

  const commandEncorder: GPUCommandEncoder = device.createCommandEncoder();
  const textureView: GPUTextureView = context.getCurrentTexture().createView();
  const renderPass: GPURenderPassEncoder = commandEncorder.beginRenderPass({
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0.5, g: 0.0, b: 0.25, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  });

  renderPass.setPipeline(pipeline);
  renderPass.draw(3, 1, 0, 0);
  renderPass.end();

  device.queue.submit([commandEncorder.finish()]);
};

Initialize();
