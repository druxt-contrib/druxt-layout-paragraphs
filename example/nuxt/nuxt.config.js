const baseUrl = process.env.GITPOD_WORKSPACE_ID
  ? `https://8080-${process.env.GITPOD_WORKSPACE_ID}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
  : 'http://druxt-layout-paragraphs-example.ddev.site'

export default {
  buildModules: [
    'druxt-entity',
    'druxt-layout-paragraphs'
  ],
  druxt: { baseUrl }
}
