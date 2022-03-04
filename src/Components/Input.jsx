import PowerInputOutlinedIcon from "@mui/icons-material/PowerInputOutlined";

function Input({ details }) {
	let {
		label,
		name,
		type,
		placeholder = "",
		Svg,
		className = "",
		show = () => {},
		handle,
	} = details;
	return (
		<label htmlFor={label}>
			<input
				type={type}
				name={name}
				id={label}
				placeholder={placeholder}
				required={true}
				onChange={(e) => handle(e)}
			/>
			{Svg ? (
				<Svg className={className} onClick={show} />
			) : (
				<PowerInputOutlinedIcon />
			)}
		</label>
	);
}

export default Input;
