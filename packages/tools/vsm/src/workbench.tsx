import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import type { FC } from "react";
import { useState } from "react";
import { CommandBarComponent } from "shared-ui-components/components/bars/CommandBarComponent";
import { FlexibleGridLayout } from "shared-ui-components/components/layout/FlexibleGridLayout";
import { SceneContext } from "./SceneContext";
import { TestComponent } from "./testComponent";
import { SceneRendererComponent } from "./components/SceneRendererComponent";
import style from "./workbench.modules.scss";
import { StatesViewComponent } from "./components/StatesViewComponent";
import type { GraphNode } from "shared-ui-components/nodeGraphSystem/graphNode";
import { SelectionContext } from "./components/SelectionContext";
import { StateBehaviorViewComponent } from "./components/StateBehaviorViewComponent";

export type WorkbenchProps = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
const INITIAL_WORKBENCH_COLOR = "#AAAAAA";

export const Workbench: FC<WorkbenchProps> = () => {
    const [workAreaColor, setWorkAreaColor] = useState(INITIAL_WORKBENCH_COLOR);
    const [scene, setScene] = useState<Nullable<Scene>>(null);
    const [selectedNode, setSelectedNode] = useState<Nullable<GraphNode>>(null);

    return (
        <SceneContext.Provider value={{ scene, setScene }}>
            <SelectionContext.Provider value={{ selectedNode, setSelectedNode }}>
                <div className={style.workbenchContainer}>
                    <CommandBarComponent
                        artboardColor={workAreaColor}
                        artboardColorPickerColor={INITIAL_WORKBENCH_COLOR}
                        onArtboardColorChanged={(newColor) => setWorkAreaColor(newColor)}
                    />
                    <div className={style.workArea} style={{ backgroundColor: workAreaColor }}>
                        <FlexibleGridLayout
                            layoutDefinition={{
                                columns: [
                                    {
                                        id: "column1",
                                        width: "30%",
                                        rows: [
                                            {
                                                id: "scene",
                                                height: "100%",
                                                selectedTab: "sceneTab",
                                                tabs: [
                                                    { id: "sceneTab", title: "Scene", component: <SceneRendererComponent /> },
                                                    { id: "test", title: "Test", component: <TestComponent name="test" /> },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: "column2",
                                        width: "70%",
                                        rows: [
                                            {
                                                id: "row4",
                                                selectedTab: "statesView",
                                                height: "70%",
                                                tabs: [{ id: "statesView", title: "States", component: <StatesViewComponent /> }],
                                            },
                                            {
                                                id: "row5",
                                                selectedTab: "behaviorView",
                                                height: "30%",
                                                tabs: [{ id: "behaviorView", title: "Behavior", component: <StateBehaviorViewComponent /> }],
                                            },
                                        ],
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </SelectionContext.Provider>
        </SceneContext.Provider>
    );
};
