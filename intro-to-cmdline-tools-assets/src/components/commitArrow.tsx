import {Circle, Ray, RayProps} from '@motion-canvas/2d';
import { SignalValue, Reference } from '@motion-canvas/core';

// https://motioncanvas.io/docs/custom-components/
export interface CommitRelationArrowProps extends RayProps {
    commitA: Reference<Circle>
    commitB: Reference<Circle>
}

export class CommitRelationArrow extends Ray {
    public constructor(props?: CommitRelationArrowProps) {
        super({
            ...props,
        })

        let commitASize = props.commitA().size()
        let commitBSize = props.commitB().size()

        this.add(
            // TODO: clamp to a min size of arrow
            <Ray
                // x={() => props.commitB().position.x()}
                // y={() => props.commitB().position.y()}
                from={props.commitB().position}
                to={props.commitA().position}


                stroke={"white"}
                lineWidth={24}

                arrowSize={36}
                endArrow
                startOffset={commitASize.x/2}
                endOffset={commitBSize.x/2}
            />
        )
    }
}
