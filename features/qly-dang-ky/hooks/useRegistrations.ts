"use client";
import { useEffect, useState, useMemo } from "react";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { DangKy } from "../types"; import { useDebounce } from 'use-debounce';

export function useRegistrations() {
    const [rows, setRows] = useState<DangKy[]>([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [query, setQuery] = useState(""); // 👈 search chung
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "created_at", sort: "desc" }]);

    const [actualQuery, setActualQuery] = useState("");

    const [searchDebounce] = useDebounce(query, 300)

    // Effect để handle debounced search
    useEffect(() => {
        // const timeoutId = setTimeout(() => {
        //     setActualQuery(query);
        //     // Reset về trang 0 khi search
        //     if (query !== actualQuery) {
        //         setPaginationModel(prev => ({ ...prev, page: 0 }));
        //     }
        // }, 300);

        // return () => clearTimeout(timeoutId);

        console.log("searchDebounce", searchDebounce);

    }, [searchDebounce]);

    useEffect(() => {
        let off = false;
        (async () => {
            setLoading(true);
            const s = sortModel[0];
            const url = new URL("/api/registrations", window.location.origin);
            url.searchParams.set("page", String(paginationModel.page));
            url.searchParams.set("pageSize", String(paginationModel.pageSize));
            if (searchDebounce) url.searchParams.set("query", searchDebounce);
            if (s) { url.searchParams.set("sortField", s.field); url.searchParams.set("sortDir", s.sort!); }

            try {
                const res = await fetch(url.toString(), { cache: "no-store" });
                const { rows, total } = await res.json();
                if (!off) { setRows(rows); setRowCount(total); setLoading(false); }
            } catch (error) {
                console.error("Error fetching registrations:", error);
                if (!off) { setRows([]); setRowCount(0); setLoading(false); }
            }
        })();
        return () => { off = true; };
    }, [paginationModel, sortModel, searchDebounce]);

    return { rows, rowCount, loading, query, setQuery, paginationModel, setPaginationModel, sortModel, setSortModel };
}