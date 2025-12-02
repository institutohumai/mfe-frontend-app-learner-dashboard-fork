import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import CustomHeader from './CustomHeader';
import CustomFooter from './CustomFooter';

const config = {
    pluginSlots: {
        'org.openedx.frontend.learner_dashboard.widget_sidebar.v1': {
            plugins: [
                {
                    // Hide the default footer
                    op: PLUGIN_OPERATIONS.Hide,
                    widgetId: 'default_contents',
                }
            ]
        },
        'org.openedx.frontend.layout.header_desktop.v1': {
            keepDefault: false,
            plugins: [
                {
                    op: PLUGIN_OPERATIONS.Insert,
                    widget: {
                        id: 'custom_desktop_header_component',
                        type: DIRECT_PLUGIN,
                        RenderWidget: () => (
                            <CustomHeader />
                        ),
                    },
                },
            ]
        },
        'org.openedx.frontend.layout.footer.v1': {
            plugins: [
                {
                    // Hide the default footer
                    op: PLUGIN_OPERATIONS.Hide,
                    widgetId: 'default_contents',
                },
                {
                    // Insert a custom footer
                    op: PLUGIN_OPERATIONS.Insert,
                    widget: {
                        id: 'custom_footer',
                        type: DIRECT_PLUGIN,
                        RenderWidget: () => (
                            <CustomFooter />
                        ),
                    },
                },
            ]
        }

    },
}

export default config;
