import React from "react";
import {Button, ButtonGroup} from "reactstrap";

const ChartGroup = ({groups, selectedOption, onChange, params}) => {

	let activeGroup = params.range_group;
	if(groups && !groups.includes(activeGroup)){
			activeGroup = selectedOption;
	}
	return (
		<>
			{groups && <ButtonGroup>
				{
					groups.map((group, index) =>
						<Button.Ripple
							key={index}
							outline
							active={group === activeGroup}
							color="primary"
							style={{textTransform: 'capitalize'}}
							onClick={
								() => onChange({range_group: group})
							}
						>
							{group}
						</Button.Ripple>
					)
				}

			</ButtonGroup>
			}
		</>
	);

};

export default ChartGroup;
